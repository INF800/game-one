import random, os
import numpy as np
from . initialdata import data
#from initialdata import data

class Agent:
    def __init__(self, gamma=0.9, lr=0.9):
        self.id2action = {
            0: 'ArrowUp',
            1: 'ArrowDown',
            2: 'ArrowRight',
            3: 'ArrowLeft',
        }
        self.action2id = dict([(v,k) for k, v in self.id2action.items()])

        self.n_actions = len(self.id2action.keys())
        self.n_states = data[4]['numRows'] * data[4]['numCols']
        self.qtable = np.zeros((self.n_states, self.n_actions)) # initial

        self.gamma = 0.9
        self.lr = 0.9

        # for state to (x,y)
        self._state2xy = {}
        for x in range(0, data[4]['numCols']):
            for y in range(0, data[4]['numRows']):
                #print(f'{x},{y}: {a.xy2state(x, y)}')
                self._state2xy[Agent.xy2state(x, y)] = (x,y)
    
    def learn(self, s: int, a: int, r: float, s_new: int, game_status, ep_num, tot_eps, epsilon):
        """ updates q-table

        Two-cases:

        updateTerm = curR + gamma*maxQ_around_next_states + curQ  
        NewQ = { curQ } + lr { updateTerm }
        """
        # `-self.qtable[s, a]` makes sure q value doesnot exceed / less than reward 
        if (game_status == 'player pitfall') or (game_status == 'gameover'):
            update_term = r - self.qtable[s, a]
        else:
            update_term = (
                r +
                self.gamma * self.__max_Q_around_state(s_new)
                - self.qtable[s, a] 
            )
        newQ = self.qtable[s, a] + self.lr*(update_term)

        print(f"{self.state2xy(s)} -> {self.state2xy(s_new)} on {self.id2action[a]} => reward: {r}")

        # update q-table
        if ep_num <= tot_eps:
            self.qtable[s, a] = newQ

        #print(self.qtable[:5, :])
        # LOG and save
        print('New Q Value: ', newQ)
        os.makedirs('saved_qtables',exist_ok=True)
        np.save(f"saved_qtables/qtable_of_episode{ep_num}_epsilon{epsilon}", self.qtable)

    def __max_Q_around_state(self, s:int):
        Qs = self.qtable[s]
        return np.max(Qs)


    def make_move(self, s: int, epsilon:float=0):
        """
        Max { qtabel[curstate] } -> action
        """
        action_ids = np.array([i for i in range(self.n_actions)])

        qs = self.qtable[s]
        maxq = np.max(qs)
        best_action = action_ids[ np.where(qs == maxq)[0] ][0]

        # epsilon[0,1] \propto randomness
        # epsilon = 1 --> always best moves
        # epsilon = 0 --> always random
        randu = np.random.uniform(0, 1)
        if not (randu<epsilon): # not using <= ehen epsilon is 1. 
            action = np.random.randint(4, size=1)[0]#random.randint(0,3) is pseudo-random
            print('making random move: ', self.id2action[action])
            return action
        else:
            print('making best move: ', self.id2action[best_action])
            return best_action # not string.. id!


    def state2xy(self, s_id):
        """ opposite of above """
        # stateid: in [0, 24]
        # coods: x in [0, 4] y in [0,4] 
        return self._state2xy[s_id]

    @staticmethod
    def xy2state(x, y):
        """ map coods to states' ids 
            
        coods (x, y) correspond to:
           
             y: 0 + --- + --- + ----+
                  |     |     |     |  
             y: 1 + --- + --- + ----+ 
                  |     |     |     | 
             y: 2 + --- + --- + ----+ 
                  |     |     |     |
             y: ..+ --- + --- + ----+ 
                x: 0     1    2     3 
          
        
        """
        # stateid: in [0, 24]
        # coods: x in [0, 4] y in [0,4] 
        stateid = x*data[4]['numRows'] + y
        return stateid


    @staticmethod
    def getEpsilon(episode_num, total_episodes=50):
        """ 
        - epsilon \propto trainingPercent \propto explotation 
        - exploits more as reaches end of training
        
        Note: It is better to make more exploration while training
        cz, q-values are produced bottom-to-top
        """
        def rectilinear(per):
            print('Training percent:', per)
            if per < 0.1    : return 0
            if per < 0.2    : return 0
            if per < 0.3    : return 0
            if per < 0.4    : return 0
            if per < 0.5    : return 0.1
            if per < 0.6    : return 0.1
            if per < 0.7    : return 0.2
            if per < 0.8    : return 0.2
            if per < 0.9    : return 0.3
            if per <= 1     : return 0.3
            if per > 1      : return 1 # after training episodes exceeds. ! Note: learn from these as well (no good. dont use those q tables)


        # todo: this is linear curve. Make it rectilinear
        training_per = episode_num / total_episodes
        #return training_per
        return rectilinear(training_per)

if __name__ == '__main__':
    a = Agent()
    for x in range(0, 5):
        for y in range(0,5):
            print(f'{x},{y}: {a.xy2state(x, y)}')