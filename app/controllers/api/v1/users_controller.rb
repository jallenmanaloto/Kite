module Api
    module V1
        class UsersController < ApplicationController
            before_action :authenticate_user!, except: [:create, :show, :edit, :current, :index, :page]
            respond_to :json

            def new
            end
            
            def page
            end

            def index
                trader = Trader.all
                render json: { trader: trader }
            end

            def show
                @user = User.find(params[:id])
            end
        
            def edit
                @user = User.find(params[:id])
            end
        
            def create
                user = User.new(user_params)
                if user.save
                    trader = Trader.create(
                        :name => user.name, 
                        :email => user.email, 
                        :user_id => user.id, 
                        :status => false,
                        :equity => 0.00,
                        :total_cash => 0.00
                    )
                else
                    format.json { render json: user.errors, status: :unprocessable_entity }
                end
            end
        
            private
        
            def user_params
                params.permit(:name, :email, :password, :password_confirm)
            end
        end
    end
end