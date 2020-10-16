data = [

  # 0: position of p1 - player
  {'x': 0, 'y': 0},
  # 1: posistion of p2 - bot
  {'x': 4, 'y': 4},
  # 2: similarly add moving / static blocks
  [
    {'x': 1, 'y': 2},
    {'x': 2, 'y': 1}
  ],
  # 3: pits: 
  # ! Must make changes to code everywherr
  # ! in frontend when new >>block/pit<< is added.
  # todo: Make it dynamic in frontend 
  [
    {'x': 3, 'y': 3},
  ],
  # 4: extra information
  {
    'numRows': 5,
    'numCols': 5,
    'playInterval': 3000,
    # toggle to stop random mover and use w-a-s-d keys only.
    'isRandomMoves': True, # or `false`
  }
]