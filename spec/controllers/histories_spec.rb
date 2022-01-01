require 'rails_helper'

describe 'History Controller', type: :request do
    let(:user) {FactoryBot.create(:user,
        :id=> 100, 
        :name => "testadmin", 
        :email => "testadmin@email.com", 
        :password => "password123"
     )}
    let(:trader) {FactoryBot.create(:trader,
        :id => 100,
        :name => "testadmin", 
        :email => "testadmin@email.com", 
        :status => false,
        :user_id => 100
    )}

    context 'gets all trade history of a Trader' do
        it 'will return a status 200' do
            get api_v1_user_trader_histories_path(user.id, trader.id)

            expect(response).to have_http_status(200)
        end

        it 'will return a list of trade history' do
            get api_v1_user_trader_histories_path(user.id, trader.id)

            expect(response).to_not be_nil
        end
    end
end