//
//  MovieCard.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/14.
//

import Foundation
import SwiftyJSON

protocol JSONable {
    init?(parameter: JSON)
}

extension JSON {
    func to<T>(type: T?) -> Any? {
        if let baseObj = type as? JSONable.Type {
            if self.type == .array {
                var arrObject: [Any] = []
                for obj in self.arrayValue {
                    let object = baseObj.init(parameter: obj)
                    arrObject.append(object!)
                }
                return arrObject
            } else {
                let object = baseObj.init(parameter: self)
                return object!
            }
        }
        return nil
    }
}

// Card for Movie and Tv
struct MediaItem: JSONable, Codable, Identifiable {
    let id: Int
    let title: String
    let year: String
    let poster_path: String
    init(parameter: JSON) {
        id = parameter["id"].intValue
        title = parameter["title"].stringValue
        year = parameter["year"].stringValue
        poster_path = parameter["poster_path"].stringValue
    }
}


// Details
struct VideoData: JSONable, Codable{
    let site: String
    let type: String
    let name: String
    var key: String
    init(parameter: JSON) {
        site = parameter["site"].stringValue
        type = parameter["type"].stringValue
        name = parameter["name"].stringValue
        key = parameter["key"].stringValue
    }
}

struct DetailsData: JSONable, Codable {
    let title: String
    let genres: String
    let spoken_languages: String
    let year: String
    let overview: String
    let vote_average: Double
    let poster_path: String
    init(parameter: JSON) {
        title = parameter["title"].stringValue
        if(parameter["genres"].stringValue == "") {
            genres = "N/A"
        } else {
            genres = parameter["genres"].stringValue
        }
        spoken_languages = parameter["spoken_languages"].stringValue
        
        if(parameter["year"].stringValue == "") {
            year = "N/A"
        } else {
            year = parameter["year"].stringValue
        }
        overview = parameter["overview"].stringValue
        vote_average = parameter["vote_average"].doubleValue / 2.0
        poster_path = parameter["poster_path"].stringValue
    }
}

struct CastItem: JSONable, Codable, Identifiable {
    let id: Int
    let name: String
    let character: String
    let profile_path: String
    init(parameter: JSON) {
        id = parameter["id"].intValue
        name = parameter["name"].stringValue
        character = parameter["character"].stringValue
        profile_path = parameter["profile_path"].stringValue
    }
}

struct ReviewItem: JSONable, Codable{
    let author: String
    let content: String
    let rating: Int
    let created_at: String
    init(parameter: JSON) {
        author = parameter["author"].stringValue
        content = parameter["content"].stringValue
        rating = parameter["rating"].intValue
        created_at = parameter["created_at"].stringValue
    }
}


struct SearchItem: JSONable, Codable, Identifiable{
    let id: Int
    let media_type: String
    let backdrop_path: String
    let title: String
    let year: String
    let vote_average: Double
    init(parameter: JSON) {
        id = parameter["id"].intValue
        media_type = parameter["media_type"].stringValue
        backdrop_path = parameter["backdrop_path"].stringValue
        title = parameter["title"].stringValue
        year = parameter["year"].stringValue
        vote_average = parameter["vote_average"].doubleValue / 2.0
    }
}
