class CreateHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :histories do |t|
      t.string :transaction_name
      t.string :stock_name
      t.string :symbol
      t.integer :quantity
      t.integer :price
      t.references :trader, null: false, foreign_key: true

      t.timestamps
    end
  end
end
