module Api
    module V1
        class TradersController < ApplicationController
            # before_action :authenticate_user!
            skip_before_action :verify_authenticity_token
            respond_to :json

            def index
                traders = Trader.all
                render json: {trader: traders}
            end
        
            def show 
                trader = Trader.find(params[:id])
                render json: { trader: trader }
            end
        
            def edit
                trader = Trader.find(params[:id])
            end

            def buy_stock
                trader = Trader.find(params[:id])
                stock_to_buy = Market.find_by(:symbol => params[:symbol])
                buy_cash = params[:amount_bought].to_i
                trader_cash = trader.total_cash
                trader.buy_stock(buy_cash)
                price =  stock_to_buy.latest_price
                shares = (buy_cash/price).to_f

                if buy_cash > trader_cash
                    render json: {error: "Not enough funds!"}
                else
                    stock = trader.stocks.find_or_create_by(symbol: stock_to_buy.symbol)
                    stock.update(
                        symbol: stock.symbol, 
                        latest_price: stock.latest_price, 
                        change_percent: stock.change_percent_s, 
                        name: stock.company_name, 
                        company_logo: stock_to_buy.logo,
                        quantity: stock.calculate_quantity(shares)
                    )
                    trader.update(total_cash: trader.total_cash)
                    history = trader.histories.create(
                        :transaction_name => "buy",
                        :stock_name => stock.company_name,
                        :symbol => stock.symbol,
                        :quantity => amount_bought,
                        :price => stock.latest_price
                    )
                    render json: { amount_paid: buy_cash, trader: trader, stock: stock }
                end
            end

            def sell_stock
                # Cannot sell more than the available shares/equity from stock
                user = User.find(params[:user_id])
                trader = Trader.find(params[:id])
                stock = trader.stocks.find_by(symbol: params[:symbol])
                sell_amount = params[:amount_sold].to_f
                trader_cash = trader.total_cash
                stock_quantity = stock.quantity
                
                case 
                    when sell_amount > stock.cash_value
                        render json: { error: "You cannot sell more than the shares you own." }
                    when sell_amount == 0
                        render json: { error: "Cannot sell 0 value." }
                    else
                        trader.update(total_cash: trader.sell_stock(sell_amount))
                        stock.update(quantity: stock.sell_stock(sell_amount))
                        history = trader.histories.create(
                            :transaction_name => "sell",
                            :stock_name => stock.company_name,
                            :symbol => stock.symbol,
                            :quantity => sell_amount,
                            :price => stock.latest_price
                        )

                        if stock.quantity == 0 || stock.quantity < 0
                            stock.destroy

                            render json: { msg: "Sold all owned shares for this stock!"}
                        else
                            render json: {trader: trader, stock: stock }
                        end
                end
            end

            def edit_trader
                @user = User.find(params[:user_id])
                @trader = Trader.find(params[:id])

                if @trader.update(trader_params)
                    # @user.send_confirmation_instructions
                    render json: { trader: @trader }
                else
                    render json: { errors: @trader.errors }
                end
            end
        
            def deposit_money
                trader = Trader.find(params[:id])
                amount = params[:total_cash]
                total_cash = trader.deposit_money(amount)
                
                if trader.update(total_cash: total_cash)
                    render json: { trader: trader }
                else
                    render json: { errors: trader.errors }
                end
            end

            def all_stocks
                # user = User.find(params[:id])
                trader = Trader.find(params[:id])
                # trader = user.trader
                stocks = trader.stocks.all

                render json: {stocks: stocks, trader: trader}
            end

            private
        
            def trader_params
                params.permit(:name, :email, :user_id, :id)
            end
        end
    end
end