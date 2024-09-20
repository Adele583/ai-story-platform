'use client'

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Book, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function MyStories() {
  const [stories, setStories] = useState([]);
  const [isNewStoryDialogOpen, setIsNewStoryDialogOpen] = useState(false);
  const [newStoryTitle, setNewStoryTitle] = useState('');
  const [editingStory, setEditingStory] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    // TODO: Replace with actual API call
    const mockStories = [
      { id: 1, title: "The Lost City", status: "Draft", lastEdited: "2024-09-15" },
      { id: 2, title: "Echoes of Eternity", status: "Published", lastEdited: "2024-09-10" },
      { id: 3, title: "Whispers in the Wind", status: "Draft", lastEdited: "2024-09-05" },
    ];
    setStories(mockStories);
  };

  const handleCreateStory = async () => {
    // TODO: Replace with actual API call
    const newStory = {
      id: Date.now(),
      title: newStoryTitle,
      status: "Draft",
      lastEdited: new Date().toISOString().split('T')[0]
    };
    setStories([...stories, newStory]);
    setIsNewStoryDialogOpen(false);
    setNewStoryTitle('');
    toast({
      title: "Story Created",
      description: `"${newStoryTitle}" has been created successfully.`,
    });
  };

  const handleEditStory = async (story) => {
    // TODO: Replace with actual API call
    const updatedStories = stories.map(s => 
      s.id === story.id ? { ...story, lastEdited: new Date().toISOString().split('T')[0] } : s
    );
    setStories(updatedStories);
    setEditingStory(null);
    toast({
      title: "Story Updated",
      description: `"${story.title}" has been updated successfully.`,
    });
  };

  const handleDeleteStory = async (storyId) => {
    // TODO: Replace with actual API call
    const updatedStories = stories.filter(s => s.id !== storyId);
    setStories(updatedStories);
    toast({
      title: "Story Deleted",
      description: "The story has been deleted successfully.",
    });
  };

  const handleToggleStatus = async (story) => {
    // TODO: Replace with actual API call
    const newStatus = story.status === "Draft" ? "Published" : "Draft";
    const updatedStories = stories.map(s => 
      s.id === story.id ? { ...s, status: newStatus, lastEdited: new Date().toISOString().split('T')[0] } : s
    );
    setStories(updatedStories);
    toast({
      title: "Status Updated",
      description: `"${story.title}" is now ${newStatus}.`,
    });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Stories</h1>
        <Button onClick={() => setIsNewStoryDialogOpen(true)} className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Story
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Card key={story.id} className="p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{story.title}</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleToggleStatus(story)}
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  story.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {story.status}
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Last edited: {story.lastEdited}</p>
            <div className="flex justify-between items-center">
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => setEditingStory(story)}>
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteStory(story.id)}>
                  <Trash2 className="mr-1 h-4 w-4" /> Delete
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                <Book className="mr-1 h-4 w-4" /> Read <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isNewStoryDialogOpen} onOpenChange={setIsNewStoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Story</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter story title"
            value={newStoryTitle}
            onChange={(e) => setNewStoryTitle(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={handleCreateStory}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editingStory !== null} onOpenChange={() => setEditingStory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Story</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter story title"
            value={editingStory?.title || ''}
            onChange={(e) => setEditingStory({ ...editingStory, title: e.target.value })}
          />
          <DialogFooter>
            <Button onClick={() => handleEditStory(editingStory)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}