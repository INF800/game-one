import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
sns.set(font_scale=1)

import pprint

from qtable.playerqtable import Agent
agent = Agent()

BASE_PATH = 'backend/saved_qtables/'
#print(os.listdir(BASE_PATH))

def plot(filename: str):
    ylabels = [f"{agent.state2xy(s_id)}" for s_id in range(agent.n_states)]
    xlabels = [f"{agent.id2action[a_id]}" for a_id in range(agent.n_actions)]

    heatmap = np.load(BASE_PATH + filename)
    plot_heapmap(heatmap, ylabels, xlabels)

def plot_heapmap(nparray, ylabels=[], xlabels=[]):
    sns.heatmap(
        nparray,
        annot=True,
        cmap='viridis',
        yticklabels= ylabels,
        xticklabels= xlabels,
        fmt='.2f',
        annot_kws={'size': 7},
    )
    plt.show()

def post_to_bestmove_map(filename):
    qtable = np.load(BASE_PATH + filename)
    pos2bestmove = {} 

    for s_id in range(agent.n_states):
        
        cood = agent.state2xy(s_id)
        four_action_qs = qtable[s_id]
        
        action_ids = np.array([i for i in range(agent.n_actions)])
        maxq = np.max(four_action_qs)
        best_action_id = action_ids[ np.where(four_action_qs == maxq)[0] ][0]
        best_action = agent.id2action[best_action_id]

        pos2bestmove[f"{cood}"] = [best_action, maxq, best_action_id]

    pprint.pprint(pos2bestmove)

    #rows = 5
    #cols = 5
    #hmap = np.zeros((rows,cols))
    #for r_idx in range(rows):
    #    for c_idx in range(cols):
    #        hmap[c_idx, r_idx] = pos2bestmove[f'({c_idx}, {r_idx})'][1]
    #
    #plot_heapmap(hmap)

if __name__ == '__main__':
    plot('qtable_of_episode50_epsilon0.3.npy')
    #post_to_bestmove_map('qtable_of_episode50_epsilon0.3.npy')