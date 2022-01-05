class Market < ApplicationRecord
    
    @@client = IEX::Api::Client.new(
            publishable_token: 'pk_41c63517dacc473eaf108633da48b5a8',
            secret_token: 'sk_a403213046f64256871f6e74f76c4cab',
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
