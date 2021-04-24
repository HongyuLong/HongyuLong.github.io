//
//  SearchViewModel.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/24.
//

import Foundation

import Alamofire
import SwiftyJSON

private let NetworkAPIBaseURL = "http://hongyu-tmdb-nodejs.us-east-2.elasticbeanstalk.com/apis/posts"

class SearchViewModel: ObservableObject {
    @Published var search_list:[SearchItem] = []
    @Published var hasSearch = false
    
    func fetchSearchData(query: String) {
        let query_wo_space = query.replacingOccurrences(of: " ", with: "%20")
        AF.request(NetworkAPIBaseURL + "/search/" + query_wo_space).responseData { response in
            let json = try! JSON(data: response.data!)
            if(json != JSON.null) {
                self.hasSearch = true
                self.search_list = self.parseSearchItems(json)
            }
        }
    }
    
    private func parseSearchItems(_ results: JSON) -> [SearchItem] {
        var cards:[SearchItem] = []
        if let cardArr = results.to(type: SearchItem.self) {
            cards = cardArr as! [SearchItem]
        }
        return cards
    }
}
