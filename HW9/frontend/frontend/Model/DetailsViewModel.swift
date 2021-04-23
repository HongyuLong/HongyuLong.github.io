//
//  DetailsViewModel.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/21.
//

import Foundation
import SwiftyJSON
import Alamofire

private let NetworkAPIBaseURL = "http://hongyu-tmdb-nodejs.us-east-2.elasticbeanstalk.com/apis/posts"

class DetailsViewModel: ObservableObject {
    @Published var fetched = false
    
    @Published var video: VideoData? = nil
    @Published var details: DetailsData? = nil
    @Published var reviews: [ReviewItem]? = nil
    @Published var casts: [CastItem]? = nil
    @Published var recommended:[MediaItem]? = nil
    
    func fetchAllData(media_type: String, media_id: Int) {
        AF.request(NetworkAPIBaseURL + "/watch/" + media_type + "/" + String(media_id)).responseData { response in
            print(response)
            let json = try! JSON(data: response.data!)
            if(json["video"] != JSON.null) {
                self.video = self.parseVideoData(json["video"])
            }
            self.details = self.parseDetailsData(json["details"])
            if(json["reviews"] != JSON.null) {
                self.reviews = self.parseReviewItems(json["reviews"])
            }
            if(json["casts"] != JSON.null) {
                self.casts = self.parseCastItems(json["casts"])
            }
            if json["recommended"] != JSON.null {
                self.recommended = self.parseMediaItems(json["recommended"])
            }
            
            self.fetched = true
        }
    }
    
    private func parseVideoData(_ results: JSON) -> VideoData {
        var data: VideoData = VideoData(parameter: "")
        if let obj = results.to(type: VideoData.self) {
            data = obj as! VideoData
        }
        return data
    }
    
    private func parseDetailsData(_ results: JSON) -> DetailsData {
        var data: DetailsData = DetailsData(parameter: "")
        if let obj = results.to(type: DetailsData.self) {
            data = obj as! DetailsData
        }
        return data
    }
    
    private func parseReviewItems(_ results: JSON) -> [ReviewItem] {
        var cards:[ReviewItem] = []
        if let cardArr = results.to(type: ReviewItem.self) {
            cards = cardArr as! [ReviewItem]
        }
        return cards
    }
    private func parseCastItems(_ results: JSON) -> [CastItem] {
        var cards:[CastItem] = []
        if let cardArr = results.to(type: CastItem.self) {
            cards = cardArr as! [CastItem]
        }
        return cards
    }
    private func parseMediaItems(_ results: JSON) -> [MediaItem] {
        var cards:[MediaItem] = []
        if let cardArr = results.to(type: MediaItem.self) {
            cards = cardArr as! [MediaItem]
        }
        return cards
    }
}
