class CreateStocks < ActiveRecord::Migration[6.1]
  def change
    create_table :stocks do |t|
      t.string :name
      t.float :latest_price
      t.float :change_percent
      t.string :symbol
      t.string :company_logo
      t.float :quantity
      t.float :amount_bought
      t.float :amount_sold
      t.references :trader

      t.timestamps
    end
  end
end
