class CreateMarkets < ActiveRecord::Migration[6.1]
  def change
    create_table :markets do |t|
      t.string :symbol
      t.string :exchange
      t.string :exchangeSuffix
      t.string :exchangeName
      t.string :exchangeSegment
      t.string :name
      t.string :date
      t.string :type_weight
      t.string :iexId
      t.string :region
      t.string :currency
      t.string :isEnabled
      t.string :figi
      t.string :cik
      t.string :lei
      t.string :exchangeSegmentName

      t.timestamps
    end
  end
end
