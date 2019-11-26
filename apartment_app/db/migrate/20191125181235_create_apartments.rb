class CreateApartments < ActiveRecord::Migration[6.0]
  def change
    create_table :apartments do |t|
      t.string :street_a
      t.string :street_b
      t.string :city
      t.integer :code
      t.string :state
      t.string :country

      t.timestamps
    end
  end
end
