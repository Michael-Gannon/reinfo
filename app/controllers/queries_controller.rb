class QueriesController < ApplicationController
  before_filter :retrieve_query, :only => [:edit, :destroy, :update, :execute]
  def index
    @queries = Query.all
  end

  def new
    @query = Query.new
  end

  def edit
  end

  def create
    Query.create!(params[:query])

    flash[:notice] = "Query created!"
    redirect_to queries_url
  end

  def destroy
    @query.delete

    flash[:notice] = "Query deleted!"
    redirect_to queries_url
  end

  def update
    if @query.update_attributes(params[:query])
      flash[:notice] = "Query updated!"
      redirect_to queries_url
    else
      flash[:notice] = "Edit failed!"
      redirect_to edit_query_url
    end
  end

  def execute
    puts "executing query..."
    begin
      execute_output = eval(@query.query)
      flash[:execute_output] = execute_output
    rescue
    end
    puts "done..."

    redirect_to queries_url
  end

  private
  def retrieve_query
    @query = Query.find(params[:id])
  end

end
