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
                    publishable_token: 'pk_a020ad363b0b447185bf2db1cfd11154',
                    secret_token: 'sk_4e277e5f5d884ae987d56fca67577a68',
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