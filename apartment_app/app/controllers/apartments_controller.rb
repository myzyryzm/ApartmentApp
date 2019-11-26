class ApartmentsController < ApplicationController
    before_action :authenticate_user!, only: [:create, :destroy]
    def index
        apartments = Apartment.all
        render json: apartments
    end

    def create
        apartment = current_user.apartments.create apartment_params
        render json: apartment, status: 201
    end

    def edit
        apartment = current_user.apartments.find params[:id]
        render json: apartment
    end

    def show
        apartment = current_user.apartments.find params[:id]
        render json: apartment
    end

    def update
        apartment = current_user.apartments.find params[:id]
        apartment.update_attributes(apartment_params)
        render json: apartment, status: 201
    end

    private
    def apartment_params
        params.require(:apartment).permit(:street_a, :city)
    end
end
