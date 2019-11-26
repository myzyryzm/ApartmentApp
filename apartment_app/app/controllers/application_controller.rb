class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    before_action :configure_devise_params, if: :devise_controller?
    skip_before_action :verify_authenticity_token
    
    def configure_devise_params
        devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
    end
end