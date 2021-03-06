class MeditationsController < ApplicationController
      def index
        meditations = Meditation.all
        hash = {}
        meditations.each do |meditation|
          meditation_id = meditation.id
          audio = meditation.audio
          title = meditation.title
          url = Rails.application.routes.url_helpers.rails_blob_url(audio, only_path: true)
          comments = meditation.comments.all
          hash[meditation_id] = {url: url, title: title, comments: comments}
        end
        render json: hash

      end
    
      def create
        meditation = Meditation.new()
        meditation.audio.attach(meditation_params["audio"])
        meditation.title = meditation_params["title"]
        if meditation.save
          url = Rails.application.routes.url_helpers.rails_blob_url(meditation.audio, only_path: true)        
          render json: {title: meditation.title, audio: url, id: meditation.id}
        else
          render json: {error: meditation.errors}
        end
      end
    
      def destroy
        meditation = Meditation.find(meditation_params[:id])
        meditation.destroy
      end
    
      private

        def meditation_params
          params.permit(:audio, :title, :id)
        end
end
