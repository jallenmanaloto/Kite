require 'rails_helper'

describe Stock, type: :model do
    context 'record is valid' do
        it 'name is not empty or nil' do 
            stock = FactoryBot.build(:stock,
                :name => nil,
                :latest_price => 100,
                :change_percent => 2.1,
                :symbol => "AAPL",
                :company_logo => "url",
                :quantity => 5,
                :amount_sold => nil,
                :amount_bought => nil
            )

            expect(stock).to_not be_valid
            expect(stock.errors).to be_present
        end

        it 'latest_price is not empty or nil' do 
            stock = FactoryBot.build(:stock,
                :name => "Apple",
                :latest_price => nil,
                :change_percent => 2.1,
                :symbol => "AAPL",
                :company_logo => "url",
                :quantity => 5,
                :amount_sold => nil,
                :amount_bought => nil
            )

            expect(stock).to_not be_nil
        end

        it 'change_percent is not empty or nil' do 
            stock = FactoryBot.build(:stock,
                :name => "Apple",
                :latest_price => 100,
                :change_percent => nil,
                :symbol => "AAPL",
                :company_logo => "url",
                :quantity => 5,
                :amount_sold => nil,
                :amount_bought => nil
            )

            expect(stock).to_not be_nil
        end

        it 'symbol is not empty or nil' do 
            stock = FactoryBot.build(:stock,
                :name => "Apple",
                :latest_price => 100,
                :change_percent => 3.2,
                :symbol => nil,
                :company_logo => "url",
                :quantity => 5,
                :amount_sold => nil,
                :amount_bought => nil
            )

            expect(stock).to_not be_nil
        end

        it 'company_logo is not empty or nil' do 
            stock = FactoryBot.build(:stock,
                :name => "Apple",
                :latest_price => 100,
                :change_percent => 3.2,
                :symbol => "AAPL",
                :company_logo => nil,
                :quantity => 5,
                :amount_sold => nil,
                :amount_bought => nil
            )

            expect(stock).to_not be_nil
        end

        it 'quantity is not empty or nil' do 
            stock = FactoryBot.build(:stock,
                :name => "Apple",
                :latest_price => 100,
                :change_percent => 3.2,
                :symbol => "AAPL",
                :company_logo => "url",
                :quantity => nil,
                :amount_sold => nil,
                :amount_bought => nil
            )

            expect(stock).to_not be_nil
        end
    end

    context 'Stock association with Trader' do
        it 'should define a has_one relationship' do 
            stock = Stock.reflect_on_association(:trader)

            expect(stock.macro).to eq(:belongs_to)
        end
    end
end

describe 'Methods' do
    context 'Stock methods' do
        let(:stock) { FactoryBot.build(:stock) }
        it 'latest_price returns a value' do
            expect(stock.latest_price).to_not be_nil
        end

        it 'change_percent returns a value' do
            expect(stock.change_percent).to be_a(Float)
            expect(stock.change_percent).to_not be_nil
        end

        it 'calculate_quantity returns a value' do
            expect(stock.calculate_quantity(10)).to be_a(Float)
            expect(stock.calculate_quantity(10)).to_not be_nil
        end

        it 'cash_value returns a value' do
            expect(stock.cash_value).to be_a(Float)
            expect(stock.cash_value).to_not be_nil
        end

        it 'company_name returns a value' do
            expect(stock.company_name).to_not be_nil
        end

        it 'company_name returns a value' do
            expect(stock.cash_value).to be_a(Float)
            expect(stock.sell_stock(10)).to_not be_nil
        end
    end
end