require 'rails_helper'


describe 'Trader controller', type: :request do
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
        :status => "false",
        :user_id => 100
    )}

    context 'get all stocks of trader' do
        it 'gets success status' do
            get  all_stocks_api_v1_user_trader_path(user.id, trader.id)

            expect(response).to have_http_status(200)
        end

        it 'gets list of all traders' do
            get api_v1_user_traders_path(user.id)

            expect(response).to_not be_nil
        end
    end
end