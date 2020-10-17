import random, os
from qtable.initialdata import data

# ----------------------------------------
# create fastapi app 
# ----------------------------------------
from fastapi import FastAPI
app = FastAPI()

# ----------------------------------------
# dependency injection
# ----------------------------------------
from fastapi import Depends

def get_db():
	""" returns db session """
	try:
		db = SessionLocal()
		yield db
	finally:
		db.close


# ----------------------------------------
# define structure for requests (Pydantic & more)
# ----------------------------------------
from fastapi import Request # for get
from pydantic import BaseModel # for post
from typing import Optional

class Coods(BaseModel):
    x: int
    y: int

class NewGameStates(BaseModel):
    curBotPos: Coods
    curPlayerPos: Coods
    block0Pos: Coods
    block1Pos: Coods
    pit0Pos: Coods

class someResponse(BaseModel):
    status: str
    reward: Optional[int] = None
    gameStatus: Optional[str] = None
    action: Optional[str] = None
    prevPlayerState: Optional[Coods] = None
    curPlayerState: Optional[Coods] = None
    newPlayerState: Optional[Coods] = None
    #newGameStates: NewGameStates # todo: remove __proto__ when coming from frontend


# -----------------------------------------
# Custom
# -----------------------------------------
from qtable.playerqtable import Agent
agent = Agent()

# -----------------------------------------
# CORS: List of servers to respond to...
# -----------------------------------------
from fastapi.middleware.cors import CORSMiddleware
origins = [
    # "http://localhost.tiangolo.com",
    # "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =============================================================================================================
# routes and related funcs
# =============================================================================================================
global_p2_moves = ['s']
global_ep_num = 0
global_epsilon = 0

@app.get("/")
def get_initial_conditions(request: Request):
	"""
    initial conditions of maze
	"""
	return data #! makes sure that api is ready initially



@app.post("/player")
def update_player_move(resp: someResponse):
    """ independant nn """
    print("="*50)
    global global_ep_num
    global global_epsilon
    print("EPISODE: ", global_ep_num)
    print("="*50)

    status = resp.status

    # Make exploitation / exploration
    if status == 'get player move':
        
        s               = agent.xy2state(x=resp.curPlayerState.x, y=resp.curPlayerState.y)
        global_epsilon  = agent.getEpsilon(global_ep_num, total_episodes=20)
        key             = agent.id2action[agent.make_move(s, epsilon=global_epsilon)] # epsilon 0 implies random move
        
        context = {'key': key}
        print('Making move:', key)
    
    # learn
    if status == 'sending cur reward and obsvn on given move':
        # learn
        context = None
        print("LEARNING")
        print(f's: {resp.prevPlayerState}')
        print(f'r: {resp.reward}')
        print(f'a: {resp.action}')
        print(f's_new: {resp.newPlayerState}') # observation
        print(f'gameStatus: {resp.gameStatus}')
        
        # update episode count
        if (resp.gameStatus == 'player pitfall') or (resp.gameStatus == 'gameover'):
            global_ep_num += 1
            
        agent.learn(
            s=agent.xy2state(resp.prevPlayerState.x, resp.prevPlayerState.y),
            a=agent.action2id[resp.action],
            r=float(resp.reward),
            s_new=agent.xy2state(resp.newPlayerState.x, resp.newPlayerState.y),
            ep_num = global_ep_num, epsilon=global_epsilon
        )

    return context



@app.post("/bot")
def update_bot_move(resp: someResponse):
    """ independant nn """
    #print("="*50)
    
    status = resp.status
    if status == 'get bot move':
        key = global_p2_moves[random.randint(0,0)]
        context = {'key': key}
        #print('Making move:', key)
    if status == 'sending cur reward and obsvn on given move':
        # learn
        context = None
        #print(f'r: {resp.reward}')
        #print(f'gameStatus: {resp.gameStatus}')


    return context