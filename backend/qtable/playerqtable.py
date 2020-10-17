import random
import numpy as np
from initialdata import data

class Agent:
    def __init__(self, gamma=0.9, lr=0.9):
        self.id2action = {
            0: 'ArrowUp',
            1: 'ArrowDown',
            2: 'ArrowLeft',
            3: 'ArrowRight',
        }
        self.action2id = dict([(v,k) for k, v in self.id2action.items()])

        self.n_actions = len(self.id2action.keys())
        self.n_states = data[4]['numRows'] * data[4]['numCols']
        self.qtable = np.zeros((self.n_states, self.n_actions)) # initial

        self.gamma = 0.9
        self.lr = 0.9
    
    def learn(self, s: int, a: int, r: float, s_new: int):
        """ updates q-table

        Q <- qtable[curstate][action]

        updateTerm = curR + gamma*maxQ_around_next_states + curQ  
        NewQ = { curQ } + lr { updateTerm }
        """
        update_term = (
            r +
            self.gamma * self.__max_Q_around_state(s_new) +
            self.qtable[s, a]
        )
        newQ = self.qtable[s, a] + self.lr*(update_term)

        # update q-table
        self.qtable[s, a] = newQ

    def __max_Q_around_state(self, s:int):
        Qs = self.qtable[s]
        return np.max(Qs)


    def make_move(self, s: int, epsilon=0):
        """
        Max { qtabel[curstate] } -> action
        """
        action_ids = np.array([i for i in range(self.n_actions)])

        #qs = self.qtable[s]
        qs = [44,202,77,11]
        maxq = np.max(qs)
        best_action = action_ids[ np.where(qs == maxq)[0] ][0]

        # epsilon[0,1] \propto randomness
        # epsilon = 0 --> always best moves
        randu = np.random.uniform(0, 1)
        if randu<epsilon:
            return random.randint(0,3)
        else:
            return best_action # not string.. id!


if __name__ == '__main__':
    a = Agent()
    a.make_move(10)