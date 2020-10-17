import random
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
    newPlayerState: Optional[Coods] = None
    #newGameStates: NewGameStates # todo: remove __proto__ when coming from frontend


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
global_p2_moves = ['d']
global_p1_moves = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft']

@app.get("/")
def get_initial_conditions(request: Request):
	"""
    initial conditions of maze
	"""
	return data #! currently not using as it hinders window.location.reload()



@app.post("/player")
def update_player_move(resp: someResponse):
    """ independant nn """
    print("="*50)

    status = resp.status
    if status == 'get player move':
        key = global_p1_moves[random.randint(0, 3)]
        context = {'key': key}
        print('Making move:', key)
        
    if status == 'sending cur reward and obsvn on given move':
        # learn
        context = None
        print(f'r: {resp.reward}')
        print(f'gameStatus: {resp.gameStatus}')
        print(f'observation: {resp.newPlayerState}')

    return context



@app.post("/bot")
def update_bot_move(resp: someResponse):
    """ independant nn """
    print("="*50)
    
    status = resp.status
    if status == 'get bot move':
        key = global_p2_moves[random.randint(0,0)]
        context = {'key': key}
        print('Making move:', key)
    if status == 'sending cur reward and obsvn on given move':
        # learn
        context = None
        print(f'r: {resp.reward}')
        print(f'gameStatus: {resp.gameStatus}')


    return context