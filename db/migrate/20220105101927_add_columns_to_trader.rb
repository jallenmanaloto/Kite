class AddColumnsToTrader < ActiveRecord::Migration[6.1]
  def change
    add_column :traders, :amount_bought, :integer
    add_column :traders, :amount_sold, :integer
  end
end
