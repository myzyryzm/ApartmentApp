class AddPlanetToApartments < ActiveRecord::Migration[6.0]
  def change
    add_column :apartments, :planet, :string
  end
end
