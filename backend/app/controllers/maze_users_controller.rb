class MazeUsersController < ApplicationController
  def index
    @maze_users = MazeUser.all
    render json: @maze_users
  end

  def show
    @maze_user = MazeUser.find(params[:id])
    render json: @maze_user
  end

  def create
    @maze = MazeUser.create(maze_user_params)
    render json: @maze
  end

  def update
    @maze = MazeUser.find(params[:id])
    if @maze.update(maze_user_update_params)
      render json: @maze
    else
      render json: @maze.errors, status: :unprocessable_entity
    end
  end

  private
  def maze_user_params
    params.require(:maze_user).permit(:user_id, :maze_id)
  end

  def maze_user_update_params
    params.require(:maze).permit(:finished_time)
  end
end
