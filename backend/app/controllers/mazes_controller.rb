class MazesController < ApplicationController
  before_action :set_maze, only: [:show, :update]

  def index
    @mazes = Maze.all
    render json: @mazes
  end

  def show
    render json: @maze
  end

  def update
    if @maze.update(maze_params)
      render json: @maze
    else
      render json: @maze.errors, status: :unprocessable_entity
    end
  end

  private
  def set_maze
    @maze = Maze.find(params[:id])
  end

  def maze_params
    params.require(:maze).permit(:id, :finished_time)
  end
end
