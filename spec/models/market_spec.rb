require 'rails_helper'

describe Market, type: :model do
    context 'Methods' do
        let(:market) { FactoryBot.build(:market) }
        
        it 'latest_price returns a value' do
            expect(market.latest_price).to_not be_nil
        end

        it 'company_info returns a value' do
            expect(market.company_info).to be_a(Hash)
        end

        it 'logo returns a value' do
            expect(market.logo).to_not be_nil
        end

        it 'news_company returns a value' do
            expect(market.news_company).to be_a(Array)
        end

        it 'chart returns a value' do
            expect(market.chart).to be_a(Array)
        end
    end
end