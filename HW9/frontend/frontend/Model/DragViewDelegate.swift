//
//  DragViewDelegate.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/27.
//

import SwiftUI

struct DragViewDelegate: DropDelegate {
    var media: WatchlistItem
    var wacthlistVM: WatchlistViewModel
    
    func performDrop(info: DropInfo) -> Bool {
        return true
    }
    
    func dropEntered(info: DropInfo) {

        let fromIndex = wacthlistVM.watchlist.firstIndex{ (media) -> Bool in
            return media.media_id == wacthlistVM.currentMedia?.media_id
        } ?? 0
                                                       
        let toIndex = wacthlistVM.watchlist.firstIndex{ (media) -> Bool in
            return media.media_id == self.media.media_id
        } ?? 0
        
        if fromIndex != toIndex {
            withAnimation(.default) {
                let fromMedia = wacthlistVM.watchlist[fromIndex]
                wacthlistVM.watchlist[fromIndex] = wacthlistVM.watchlist[toIndex]
                wacthlistVM.watchlist[toIndex] = fromMedia
                wacthlistVM.writeToLocalStorage()
            }
        }
    }
    
    func dropUpdated(info: DropInfo) -> DropProposal? {
        return DropProposal(operation: .move)
    }
}
