class ApartmentsController < ApplicationController
    def index
        apartments = Apartment.all
        render json: apartments
    end

    def show
        apartment = current_user.apartments.find params[:id]
        render json: apartment
    end

    private
    def apartment_params
        params.require(:apartment).permit(:street_a, :city)
    end
end
