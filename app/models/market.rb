class Market < ApplicationRecord
    
    @@client = IEX::Api::Client.new(
            publishable_token: 'pk_a020ad363b0b447185bf2db1cfd11154',
            secret_token: 'sk_4e277e5f5d884ae987d56fca67577a68',
            endpoint: 'https://cloud.iexapis.com/v1'
        )

    def latest_price()
        quote = @@client.quote(self.symbol)
        quote.latest_price
    end

    def change_percent_s
        quote = @@client.quote(self.symbol)
        quote.change_percent_s
    end

    def top_movers
        market = client.stock_market_list(:mostactive) ## migrate this to Market Controller for easier json request
    end

    def company_info
        company = @@client.company(self.symbol)
    end

    def logo
        logo = @@client.logo(self.symbol)
    end

    def news_company
        news = @@client.news(self.symbol)
    end

    def chart
        chart = @@client.chart(self.symbol)
    end
end
