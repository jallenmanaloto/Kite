# require 'rails_helper'
# include ActionController::RespondWith

# describe 'User with devise', type: :request do
#     # before do |test|
#     #     unless test.metadata[:skip_before]
#     #         sign_in create(:user)
#     #     end
#     # end

#     # context 'accessing page with valid sign in' do
#     #     it 'redirects to root path' do
#     #         get '/api/v1/users'
#     #         expect(response).to have_http_status(302)
#     #     end
#     # end
#     before (:each) do
#        @current_user = FactoryBot.build(:user) #, :email => 'sampleemail1@email.com', :id => 100)
#         # @client = FactoryBot.create(:client)
#     end
    

#     context 'sign up', :skip_before do
#         it 'returns 200 status' do
#             # post user_registration_path()
#             login
#             request.headers.merge!(user.create_new_auth_token)
#             expect(response).to eq(200)
#         end
#     end

#     # context 'accessing page without authentication', :skip_before do
#     #     it 'raises error' do
#     #         get '/api/v1/users'
#     #         expect(response).to have_http_status(302)
#     #     end
#     # end

#     def login
#         post '/auth/sign_in', params:  { email: @current_user.email, password: 'password' }.to_json, headers: { 'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json' }
#     end
# end