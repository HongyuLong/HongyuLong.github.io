//
//  WatchlistViewModel.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/25.
//

import Foundation

class WatchlistViewModel: ObservableObject {
    @Published var watchlist:[WatchlistItem] = []
    
    private var myKey:String = "watchlist"
    
    func addToWatchlist(id: Int, media_type: String, poster_path: String) {
        self.readFromLocalStorage()
        let newItem = WatchlistItem(id: id, media_type: media_type, poster_path: poster_path);
        self.watchlist.append(newItem)
        self.writeToLocalStorage()
    }
    
    func removedFromWatchlist(id: Int, media_type: String) {
        self.readFromLocalStorage()
        let index = self.findIndexOf(id: id, media_type: media_type)
        self.watchlist.remove(at: index)
        self.writeToLocalStorage()
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
    
    private func writeToLocalStorage() {
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
    
    func checkIfExist(id: Int, media_type: String) -> Bool {
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
            if(watchlist[i].id == id && watchlist[i].media_type == media_type) {
                index = i
                break
            }
        }
        return index
    }
    
}
