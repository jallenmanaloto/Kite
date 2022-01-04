module Api
    module V1
        class MarketsController < ApplicationController
            skip_before_action :verify_authenticity_token
            def search
                company = Market.where('LOWER(name) LIKE ?', "%#{params[:search].downcase}%")

                
                render json: {stock: company}
            end

            def index
                market = client.stock_market_list(:mostactive) 

                render json: {mostactive: market}
            end

            def specific_company
                @market = Market.find(params[:id])

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