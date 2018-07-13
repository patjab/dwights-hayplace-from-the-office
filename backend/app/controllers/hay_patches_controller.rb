class HayPatchesController < ApplicationController
  before_action :set_hay_patch, only: [:show]

  def index
    @hay_patches = HayPatch.all
    render json: @hay_patches
  end

  def show
    render json: @hay_patch
  end

  private
  def set_hay_patch
    @hay_patch = Maze.find(params[:id])
  end
end
