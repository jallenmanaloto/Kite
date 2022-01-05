module Api
    module V1
        class MarketsController < ApplicationController
            skip_before_action :verify_authenticity_token
            def search
                company = Market.where('LOWER(name) LIKE ?', "%#{params[:search].downcase}%")
                render json: {stock: company}
            end

            def index
                client = IEX::Api::Client.new(
                    publishable_token: 'pk_41c63517dacc473eaf108633da48b5a8',
                    secret_token: 'sk_a403213046f64256871f6e74f76c4cab',
                    endpoint: 'https://cloud.iexapis.com/v1'
                )
                market = client.stock_market_list(:mostactive) 

                render json: {mostactive: market}
            end

            def specific_company
                @market = Market.find_by(:symbol => params[:symbol])

                render json: { 
                    latest_price: @market.latest_price,
                    change_percent: @market.change_percent_s,
                    company_info: @market.company_info,
                    logo: @market.logo,
                    news_company: @market.news_company,
                    charts: @market.chart
                }
            end
        end
    end
end