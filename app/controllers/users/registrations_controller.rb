class Users::RegistrationsController < DeviseTokenAuth::RegistrationsController
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
    def create
        user = User.new(sign_up_params)
        if user.save
          UserMailer.approve_account(user).deliver_later
          trader = Trader.create(
            :name => user.name, 
            :email => user.email, 
            :user_id => user.id, 
            :status => "false",
            :equity => 0.00,
            :total_cash => 0.00
            )

            render json: { user: user, trader: trader }
          else
            render json: {errors: user.errors, user: user}
        end
    end
        
    private

    def sign_up_params
        params.require(:user).permit(:name, :email, :password, :nickname)
    end
end