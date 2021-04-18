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
//            print("json: \(self)")
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

struct DynamicCard: JSONable {
    let id :Int!
    let title :String!
    let poster_path :String!
    init(parameter: JSON) {
        id = parameter["id"].intValue
        title = parameter["title"].stringValue
        poster_path = parameter["poster_path"].stringValue
    }
}

// Card for Movie and Tv
struct StaticCard: JSONable {
    let id: Int!
    let title: String!
    let year: Int!
    let poster_path: String!
    init(parameter: JSON) {
        id = parameter["id"].intValue
        title = parameter["title"].stringValue
        year = parameter["year"].intValue
        poster_path = parameter["poster_path"].stringValue
    }
}



