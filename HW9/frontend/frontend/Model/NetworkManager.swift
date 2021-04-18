//
//  NetworkManager.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/16.
//

import Foundation
import Alamofire
import SwiftyJSON

private let NetworkAPIBaseURL = "http://hongyu-tmdb-nodejs.us-east-2.elasticbeanstalk.com/apis/posts"

class NetworkManager {
    static let shared = NetworkManager()
    
    private init() {}
    
    @discardableResult
    func requestGet(path: String, completion: @escaping (Result<Data, Error>) -> Void) -> DataRequest{
        AF.request(NetworkAPIBaseURL + path,
                   requestModifier: { $0.timeoutInterval = 15})
            .responseData { response in
                switch response.result {
                case let .success(data):
                    completion(.success(data))
                case let .failure(error):
                    completion(.failure(error))
                }
            }
    }
}
