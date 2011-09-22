class Query < ActiveRecord::Base
  is_searchable :only => [:id]
end
