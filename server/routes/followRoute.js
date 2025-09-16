import express from "express";
import requireAuth from "../middleware/authMiddleware.js";
import {
  followUser, acceptRequest, rejectRequest, cancelRequest, unfollowUser,
  getFollowers, getFollowing, getIncomingRequests, getOutgoingRequests,
  isFollowing, isFollowedBy, hasPendingRequest,
} from "../controllers/followController.js";

const router = express.Router();

// require auth for all follow routes
router.use(requireAuth);

router.post("/:recipient", followUser);
router.patch("/accept/:requester", acceptRequest);
router.patch("/reject/:requester", rejectRequest);
router.delete("/cancel/:requester", cancelRequest);
router.delete("/:requester", unfollowUser);

router.get("/followers", getFollowers);
router.get("/following", getFollowing);
router.get("/requests/incoming", getIncomingRequests);
router.get("/requests/outgoing", getOutgoingRequests);

router.get("/is-following/:recipient", isFollowing);
router.get("/followed-by/:requester", isFollowedBy);
router.get("/is-pending/:user_id", hasPendingRequest);

export default router;
