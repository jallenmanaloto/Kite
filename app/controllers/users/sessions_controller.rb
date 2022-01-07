class Users::SessionsController < DeviseTokenAuth::SessionsController
    # protect_from_forgery with: :null_session
    
    def create

    #     super
    #     render json: { data: @resource.errors }
    end
end