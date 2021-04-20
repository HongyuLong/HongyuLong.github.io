//
//  HomeViewModel.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/20.
//

import Foundation
import SwiftyJSON
import Alamofire

private let NetworkAPIBaseURL = "http://hongyu-tmdb-nodejs.us-east-2.elasticbeanstalk.com/apis/posts"

class HomeViewModel: ObservableObject {
    @Published var airing_today_list:[MediaItem] = []
    
    func fecthAiringToday() {
        AF.request(NetworkAPIBaseURL + "/home/tv").responseData { response in
            let json = try! JSON(data: response.data!)
            self.airing_today_list = self.parseMediaItems(json["now_playing"])
        }
    }
    
    private func parseMediaItems(_ results: JSON) -> [MediaItem] {
        var cards:[MediaItem] = []
        if let cardArr = results.to(type: MediaItem.self) {
            cards = cardArr as! [MediaItem]
        }
        return cards
    }
}
