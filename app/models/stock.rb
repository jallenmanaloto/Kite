class Stock < ApplicationRecord
    belongs_to :trader

    validates_presence_of :name, :latest_price, :change_percent, :symbol, :company_logo, :quantity

    @@client = IEX::Api::Client.new(
        publishable_token: 'pk_41c63517dacc473eaf108633da48b5a8',
        secret_token: 'sk_a403213046f64256871f6e74f76c4cab',
        endpoint: 'https://cloud.iexapis.com/v1'
    )

    def latest_price
        quote = @@client.quote(self.symbol)
        quote.latest_price
    end

    def change_percent_s
        quote = @@client.quote(self.symbol)
        quote.change_percent_s
    end

    def calculate_quantity(shares)
        if self.quantity == nil
            self.quantity = 0
            current_quantity = self.quantity
            self.quantity = current_quantity + shares
        else
            current_quantity = self.quantity
            self.quantity = current_quantity + shares
        end
    end

    def cash_value
       self.latest_price * self.quantity
    end

    def company_name
        company = @@client.company(self.symbol)
        company.company_name
    end

    def sell_stock(quantity)
        # deduct amount of quantity to be sold
        # calculate equity and add to trader's total_cash
        
        self.quantity = ((self.quantity * self.latest_price) - quantity)/self.latest_price
    end
end
