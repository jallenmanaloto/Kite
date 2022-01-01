class Users::SessionsController < DeviseTokenAuth::RegistrationsController
    protect_from_forgery with: :null_session
    
    def create
        

        render json: { data: current_user.confirmation_token, headers: response.headers }
    end
end