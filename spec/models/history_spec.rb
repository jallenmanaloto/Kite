require 'rails_helper'

describe History, type: :model do
    context 'Validations with empty attributes' do
        it 'should return error if transaction_name is nil' do 
            history = FactoryBot.build(:history,
                :transaction_name => nil,
                :stock_name => "Tesla",
                :symbol => "TSLA",
                :quantity => "10",
                :price => "100"
            )

        expect(history).to_not be_valid
        expect(history.errors).to be_present
        end

        it 'should return error if stock_name is nil' do 
            history = FactoryBot.build(:history,
                :transaction_name => "Buy",
                :stock_name => nil,
                :symbol => "TSLA",
                :quantity => "10",
                :price => "100"
            )

        expect(history).to_not be_valid
        expect(history.errors).to be_present
        end

        it 'should return error if symbol is nil' do 
            history = FactoryBot.build(:history,
                :transaction_name => "Buy",
                :stock_name => "Tesla",
                :symbol => nil,
                :quantity => "10",
                :price => "100"
            )

        expect(history).to_not be_valid
        expect(history.errors).to be_present
        end

        it 'should return error if quantity is nil' do 
            history = FactoryBot.build(:history,
                :transaction_name => "Buy",
                :stock_name => "Tesla",
                :symbol => "TSLA",
                :quantity => nil,
                :price => "100"
            )

        expect(history).to_not be_valid
        expect(history.errors).to be_present
        end

        it 'should return error if price is nil' do 
            history = FactoryBot.build(:history,
                :transaction_name => "Buy",
                :stock_name => "Tesla",
                :symbol => "TSLA",
                :quantity => "10",
                :price => nil
            )

        expect(history).to_not be_valid
        expect(history.errors).to be_present
        end
    end

    context 'Validations with correct parameters' do
        it 'should be valid and no error return if all attributes are not empty' do
            history = FactoryBot.build(:history)

            expect(history).to be_valid
        end
    end

    context 'Valid table transaction_name' do
        it 'will not return error if equal to Buy' do
            history = FactoryBot.build(:history,
                :transaction_name => "Buy",
                :stock_name => "Tesla",
                :symbol => "TSLA",
                :quantity => "10",
                :price => "100"
            )

            expect(history).to be_valid
            expect(history.transaction_name).to eq("Buy")
        end

        it 'will not return error if equal to Sell' do
            history = FactoryBot.build(:history,
                :transaction_name => "Sell",
                :stock_name => "Tesla",
                :symbol => "TSLA",
                :quantity => "10",
                :price => "100"
            )

            expect(history).to be_valid
            expect(history.transaction_name).to eq("Sell")
        end

        it 'will return an error if equals to other value' do
            history = FactoryBot.build(:history,
                :transaction_name => "Diff",
                :stock_name => "Tesla",
                :symbol => "TSLA",
                :quantity => "10",
                :price => "100"
            )

            expect(history).to_not be_valid
            expect(history.errors).to be_present
        end
    end

    context 'Association with Trader' do
        it 'should be defined as belongs_to trader' do
            history = History.reflect_on_association(:trader)

            expect(history.macro).to eq(:belongs_to)
        end
    end
end