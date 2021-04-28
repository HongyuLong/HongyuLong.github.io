//
//  WatchlistViewModel.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/25.
//

import Foundation

extension Array {
    func chunked(into size:Int) -> [[Element]] {
        
        var chunkedArray = [[Element]]()
        
        for index in 0...self.count {
            if index % size == 0 && index != 0 {
                chunkedArray.append(Array(self[(index - size)..<index]))
            } else if(index == self.count) {
                chunkedArray.append(Array(self[index - 1..<index]))
            }
        }
        
        return chunkedArray
    }
}

class WatchlistViewModel: ObservableObject {
    @Published var watchlist:[WatchlistItem] = []
    @Published var currentMedia: WatchlistItem?
    
    private var myKey:String = "watchlist"
    
    init() {
        self.readFromLocalStorage()
    }
    
    func addToWatchlist(id: Int, media_type: String, poster_path: String) {
        self.readFromLocalStorage()
        let newItem = WatchlistItem(media_id: id, media_type: media_type, poster_path: poster_path);
        self.watchlist.append(newItem)
        self.writeToLocalStorage()
    }
    
    func removedFromWatchlist(id: Int, media_type: String) {
        self.readFromLocalStorage()
        let index = self.findIndexOf(id: id, media_type: media_type)
        self.watchlist.remove(at: index)
        self.writeToLocalStorage()
    }
    
    func checkIfExist(id: Int, media_type: String) -> Bool {
//        self.readFromLocalStorage()
        let index = self.findIndexOf(id: id, media_type: media_type)
        if(index > -1) {
            return true
        }
        else {
            return false
        }
    }
    
    private func findIndexOf(id: Int, media_type: String) -> Int {
        var index:Int = -1
        for i in self.watchlist.indices {
            if(watchlist[i].media_id == id && watchlist[i].media_type == media_type) {
                index = i
                break
            }
        }
        return index
    }
    
    func readFromLocalStorage() {
        if let data = UserDefaults.standard.data(forKey: myKey) {
            do {
                // Create JSON Decoder
                let decoder = JSONDecoder()

                // Decode Note
                self.watchlist = try decoder.decode([WatchlistItem].self, from: data)
            } catch {
                print("Unable to Decode Watchlist (\(error))")
            }
        }
    }
    
    func writeToLocalStorage() {
        do {
            // Create JSON Encoder
            let encoder = JSONEncoder()

            // Encode Note
            let data = try encoder.encode(self.watchlist)

            // Write/Set Data
            UserDefaults.standard.set(data, forKey: myKey)
        } catch {
            print("Unable to Encode Array of Watchlist (\(error))")
        }
    }
    
}
