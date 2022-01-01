require 'rails_helper'

describe Trader, type: :model do
    let(:trader) { FactoryBot.build(:trader) }
    let(:user) { FactoryBot.build(:user) }

    context 'Creating a valid trader record' do
        it 'where name is not empty or nil' do
            expect(trader.name).to_not be_nil
        end

        it 'where email is not empty or nil' do
            expect(trader.email).to_not be_nil
        end

        it 'where name is equal to name from User' do
            expect(trader.name).to eq(user.name)
        end

        it 'where email is equal to name from User' do
            expect(trader.email).to eq(user.email)
        end
    end

    context 'Creating an invalid trader record' do
        it 'where name is nil' do
            user = FactoryBot.build(:user,
                :name => nil,
                :email => "test01@email.com",
                :password => "password123"
            )
            trader = FactoryBot.build(:trader,
                :name => nil,
                :status => false,
                :total_cash => 0.00,
                :email => "test01@email.com",
                :equity => 0.00
            )
            
            expect(trader.name).to be_nil
        end

        it 'where email is nil' do
            user = FactoryBot.build(:user,
                :name => "test01",
                :email => nil,
                :password => "password123"
            )
            trader = FactoryBot.build(:trader,
                :name => "test01",
                :status => false,
                :total_cash => 0.00,
                :email => nil,
                :equity => 0.00
            )
            
            expect(trader.email).to be_nil
        end
    end

    context 'Creating a new trader record with default attributes' do
        it 'total_cash value is 0' do
            expect(trader.total_cash).to eq(0)
        end

        it 'profit value is 0' do
            expect(trader.equity).to eq(0)
        end

        it 'status value is false' do
            expect(trader.status).to eq("false")
        end
    end

    context 'Association of trader to User' do
        it 'should define a belongs_to relationship' do 
            trader = Trader.reflect_on_association(:user)

            expect(trader.macro).to eq(:belongs_to)
        end
    end

    context 'Association of trader to Stock' do
        it 'should define a has_many relationship' do 
            trader = Trader.reflect_on_association(:stocks)

            expect(trader.macro).to eq(:has_many)
        end
    end

    context 'Association of trader to History' do
        it 'should define a has_many relationship to History' do 
            trader = Trader.reflect_on_association(:histories)

            expect(trader.macro).to eq(:has_many)
        end
    end
end