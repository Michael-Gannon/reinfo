class AddTimestampsToProperty < ActiveRecord::Migration
  def self.up
    change_table :properties do |t|
      t.timestamps
    end

    dates_and_ranges = [{:date => Date.new(2011,07,11), :range=>1..2656},
                         {:date => Date.new(2011,07,12), :range=>2657..5294},
                         {:date => Date.new(2011,07,13), :range=>5295..7940},
                         {:date => Date.new(2011,07,14), :range=>7941..10591}]

    dates_and_ranges.each do | date_and_range |
      id_range = date_and_range[:range]
      date = date_and_range[:date]

      Property.where(:id=>id_range).update_all(:created_at=>date, :updated_at=>date)
    end

  end

  def self.down
    remove_column :properties, :created_at
    remove_column :properties, :updated_at
  end
end