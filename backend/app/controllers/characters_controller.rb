class CharactersController < ApplicationController
  before_action :set_character, only: [:show]

  def index
    @characters = Character.all
    render json: @characters
  end

  def show
    render json: @character
  end

  private
  def set_character
    @character = Character.find(params[:id])
  end
end
