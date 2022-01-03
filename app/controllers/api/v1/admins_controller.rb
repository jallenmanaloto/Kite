module Api
    module V1
        class AdminsController < ApplicationController
            skip_before_action :verify_authenticity_token
            def approve_account
                @user = User.find(params[:id])
                @trader = Trader.find(params[:user_id])

                if @trader.update(status: "true")
                    UserMailer.admin_approve(@user).deliver_later
                    render json: {user: @user, trader: @trader}
                else
                    render json: { errors: @trader.errors }
                end
            end
        end
    end
end