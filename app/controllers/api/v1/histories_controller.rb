module Api
    module V1
        class HistoriesController < ApplicationController
            skip_before_action :verify_authenticity_token
            def index
                user = User.find(params[:user_id])
                trader = user.trader
                history = trader.histories.all

                render json: { history: history }, status: :ok
            end
        end
    end
end