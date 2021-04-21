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
    @Published var now_playing_list:[MediaItem] = []
    @Published var top_rated_list:[MediaItem] = []
    @Published var popular_list:[MediaItem] = []
    
    func fetchHomeTvData() {
        AF.request(NetworkAPIBaseURL + "/home/tv").responseData { response in
            DispatchQueue.main.async {
                let json = try! JSON(data: response.data!)
                self.now_playing_list = self.parseMediaItems(json["now_playing"])
                self.top_rated_list = self.parseMediaItems(json["top_rated"])
                self.popular_list = self.parseMediaItems(json["popular"])
            }
        }
    }
    
    func fetchHomeMovieData() {
        AF.request(NetworkAPIBaseURL + "/home/movie").responseData { response in
            DispatchQueue.main.async {
                let json = try! JSON(data: response.data!)
                self.now_playing_list = self.parseMediaItems(json["now_playing"])
                self.top_rated_list = self.parseMediaItems(json["top_rated"])
                self.popular_list = self.parseMediaItems(json["popular"])
            }
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
